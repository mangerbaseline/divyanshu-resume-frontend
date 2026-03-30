import { useState, useEffect } from "react";



const FormFunction = () => {


    const [step, setStep] = useState(1);

    const totalSteps = 3;

    const handleStep = (operation) => {
        setStep((prevStep) => {
            if (operation === "next") {
                return prevStep < totalSteps ? prevStep + 1 : prevStep;
            }
            if (operation === "previous") {
                return prevStep > 1 ? prevStep - 1 : prevStep;
            }

        });
    };




    return (
        <>

            <h1>Form </h1>

            <div>Profile Section</div>


            {step == 1 &&
                <div>
                    <div> <input className="border border-white p-2 my-3" placeholder="Name" /></div>
                    <div> <input className="border border-white p-2 my-3" placeholder="UserName" /></div>
                    <div> <input className="border border-white p-2 my-3" placeholder="Age" /></div>
                </div>
            }

            {step == 2 &&
                <div>
                    <div><input className="border border-white p-2 my-3" placeholder="Company name" /></div>
                    <div><input className="border border-white p-2 my-3" placeholder="Company Size" /></div>
                    <div><input className="border border-white p-2 my-3" placeholder="Referal" /></div>
                </div>
            }

            {step == 3 &&
                <div>
                    <div><input className="border border-white p-2 my-3" placeholder="Email" /></div>
                    <div> <input className="border border-white p-2 my-3" placeholder="Password" /></div>
                </div>
            }



            <div className="flex gap-[40px]">
                <button onClick={() => handleStep('previous')}>Previous</button>
                <button onClick={() => handleStep('next')}>Next</button>
            </div>


        </>
    )
}

export default FormFunction