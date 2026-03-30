import { useState, useEffect } from "react";
import { Check, CreditCard, Shield, Zap, QrCode, Smartphone, X, Loader2 } from "lucide-react";
import Script from 'next/script';
import { loadStripe } from '@stripe/stripe-js';
import { API } from "@/config";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Subscription({ currentSubscription }) {
    const [selectedPlan, setSelectedPlan] = useState("monthly");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [subscription, setSubscription] = useState(currentSubscription);
    const { data: session } = useSession();
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        } else {
            const localUser = localStorage.getItem('user');
            if (localUser) {
                try {
                    setUser(JSON.parse(localUser));
                } catch (e) {
                    console.error("Error parsing local user", e);
                }
            }
        }
    }, [session]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!subscription && (session || token)) {
            fetchSubscription();
        }
    }, [session]);


    // Handle payment success/cancel query params
    useEffect(() => {
        if (router.query.payment === 'success') {
            toast.success("Payment Received! Upgrade successful.", { duration: 5000 });
            fetchSubscription();
            // Clean up the URL
            router.replace(router.pathname, undefined, { shallow: true });
        } else if (router.query.payment === 'cancel') {
            toast.error("Payment cancelled.");
            router.replace(router.pathname, undefined, { shallow: true });
        }
    }, [router.query]);

    const fetchSubscription = async () => {
        try {
            const token = session?.backendToken || localStorage.getItem('token');
            if (!token) return;

            const res = await fetch(`${API}/api/payment/subscription`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!data.error) {
                setSubscription(data);
            }
        } catch (err) {
            console.error("Error fetching subscription:", err);
        }
    };

    const plans = [
        {
            id: "monthly",
            name: "Pro Monthly",
            price: "10",
            period: "/month",
            features: [
                "Unlimited Resume Generations",
                "All Premium Templates",
                "AI Content Optimization",
                "Custom PDF Export",
                "Priority Support",
            ],
            description: "Perfect for active job seekers",
            highlight: false
        },
        {
            id: "yearly",
            name: "Pro Yearly",
            price: "70",
            period: "/year",
            features: [
                "Everything in Monthly",
                "58% Savings vs Monthly",
                "Early Access to New Themes",
                "Personal Resume Branding",
                "Lifetime Storage"
            ],
            description: "Best value for long-term growth",
            highlight: true
        }
    ];

    const handlePaymentInitiation = async (method) => {
        // alert("Payment initiated for " + method);
        const token = session?.backendToken || localStorage.getItem('token');
        if (!session && !token) {
            toast.error("Please sign in to upgrade your account");
            router.push('/signin');
            return;
        }



        if (method === "Razorpay") {
            handleRazorpayPayment();
            return;
        }

        if (method === "Stripe") {
            handleStripePayment();
            return;
        }

        setPaymentMethod(method);
        setIsPaymentModalOpen(true);
        setIsProcessing(true);

        // Simulate a small delay for the "processing" state
        setTimeout(() => {
            setIsProcessing(false);
        }, 1500);
    };

    const handleStripePayment = async () => {
        console.log("Stripe payment initiated...");
        const toastId = toast.loading("Preparing secure checkout...");
        try {
            setIsProcessing(true);
            const token = session?.backendToken || localStorage.getItem('token');
            console.log("Token:", token ? "Exist" : "Missing");
            const res = await fetch(`${API}/api/payment/stripe/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ planId: selectedPlan })
            });

            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);

            if (data.error) throw new Error(data.error);

            if (data.url) {
                toast.success("Redirecting to Stripe...", { id: toastId });
                window.location.href = data.url;
            } else {
                toast.dismiss(toastId);
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
                await stripe.redirectToCheckout({ sessionId: data.id });
            }
        } catch (error) {
            console.error("Stripe error:", error);
            toast.error(error.message || "Failed to initiate Stripe payment.", { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            setIsProcessing(true);
            const plan = plans.find(p => p.id === selectedPlan);
            const amount = plan.price;

            // 1. Create Order
            const token = session?.backendToken || localStorage.getItem('token');
            const res = await fetch(`${API}/api/payment/razorpay/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ planId: selectedPlan })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            const order = data.data || data;

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_razorpay_id',
                amount: order.amount,
                currency: order.currency,
                name: "ResumeCraft",
                description: `Upgrade to ${plan.name}`,
                order_id: order.id,
                handler: async function (response) {
                    // 2. Verify Payment
                    try {
                        const token = session?.backendToken || localStorage.getItem('token');
                        const verifyRes = await fetch(`${API}/api/payment/razorpay/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ ...response, planId: selectedPlan })
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            toast.success("Payment successful! Your account has been upgraded.");
                            window.location.reload();
                        } else {
                            toast.error(verifyData.error || "Payment verification failed.");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Error verifying payment.");
                    }
                },
                prefill: {
                    name: user?.name || "User Name",
                    email: user?.email || "user@example.com",
                },

                theme: {
                    color: "#4f46e5"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Razorpay error:", error);
            alert("Failed to initiate Razorpay payment.");
        } finally {
            setIsProcessing(false);
        }
    };

    const closePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setPaymentMethod(null);
        setIsProcessing(false);
    };

    return (


        <section className="relative z-10 space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Upgrade to Premium
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Unlock the full potential of your career with advanced AI features and stunning premium designs.
                </p>

                {subscription?.status === 'active' && (
                    <div className="mt-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-lg mx-auto animate-in zoom-in-95 duration-500">
                        <p className="text-emerald-400 font-bold flex items-center justify-center gap-2">
                            <Shield size={18} />
                            You are currently on the <span className="uppercase">{subscription.plan}</span> plan
                        </p>
                        <p className="text-[10px] text-emerald-500/70 mt-1 uppercase tracking-widest">
                            Enjoy your premium features!
                        </p>
                    </div>
                )}
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${plan.highlight
                            ? "bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.1)] scale-105 z-10"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                Best Value
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">${plan.price}</span>
                                <span className="text-slate-500 text-sm">{plan.period}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">{plan.description}</p>
                        </div>

                        <div className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="text-xs text-slate-300 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelectedPlan(plan.id)}
                            disabled={subscription?.plan === plan.id && subscription?.status === 'active'}
                            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 ${subscription?.plan === plan.id && subscription?.status === 'active'
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                                : selectedPlan === plan.id
                                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                                }`}
                        >
                            {subscription?.plan === plan.id && subscription?.status === 'active' ? 'Active Plan' : `Select ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment Options Section */}

            <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            <Shield size={20} className="text-indigo-400" /> Secure Checkout
                        </h4>
                        <p className="text-xs text-slate-500">Pick your preferred secure payment method below.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                        <button
                            onClick={() => handlePaymentInitiation("Stripe")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <CreditCard size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Stripe</span>
                        </button>

                        {/* <button
                            onClick={() => handlePaymentInitiation("Razorpay")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <Zap size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Razorpay</span>
                        </button> */}

                        {/* <button
                            onClick={() => handlePaymentInitiation("Mastercard / Visa")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <Smartphone size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Cards</span>
                        </button> */}

                        {/* <button
                            onClick={() => handlePaymentInitiation("UPI / QR")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <QrCode size={20} className="text-orange-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">UPI / QR</span>
                        </button> */}
                    </div>
                </div>

                {/* <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 opacity-40">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg" alt="Amazon Pay" className="h-5" />
                </div> */}
            </div>

            {/* Mock Payment Modal */}
            {isPaymentModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-default"
                    onClick={closePaymentModal}
                >
                    <div
                        className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closePaymentModal}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-[110]"
                        >
                            <X size={20} />
                        </button>

                        {isProcessing ? (
                            <div className="py-20 flex flex-col items-center justify-center space-y-4">
                                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                                <p className="text-sm font-medium text-slate-400">Connecting to {paymentMethod} Secure Gateway...</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-400">
                                        <Shield size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{paymentMethod} Payment</h3>
                                    <p className="text-xs text-slate-500 mt-2">Complete your upgrade to {selectedPlan === "monthly" ? "Pro Monthly" : "Pro Yearly"}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                            <span className="text-xs text-slate-400 font-medium">Order Total:</span>
                                            <span className="text-lg font-bold text-white">${selectedPlan === "monthly" ? "10.00" : "70.00"}</span>
                                        </div>

                                        {paymentMethod === "UPI / QR" ? (
                                            <div className="flex flex-col items-center gap-4 py-4">
                                                <div className="p-4 bg-white rounded-2xl">
                                                    <QrCode size={160} className="text-slate-900" />
                                                </div>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Scan to Pay via UPI</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Card Details</label>
                                                    <div className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-slate-700 flex items-center gap-3">
                                                        <CreditCard size={16} className="text-slate-500" />
                                                        <span>•••• •••• •••• ••••</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Expiry</label>
                                                        <div className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm">MM / YY</div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">CVC</label>
                                                        <div className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm">•••</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            alert("This is a demo payment flow. Your account will be upgraded shortly.");
                                            closePaymentModal();
                                        }}
                                        className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-[0.98]"
                                    >
                                        Pay ${selectedPlan === "monthly" ? "10.00" : "70.00"} Now
                                    </button>

                                    <p className="text-center text-[10px] text-slate-600 font-medium pb-2">
                                        Locked and secured with 256-bit encryption. Your data is never shared.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
