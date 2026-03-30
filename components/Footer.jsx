// components/Footer.js (Updated for resume builder)
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    product: [
      { label: 'Resume Templates', href: '/templates' },
      { label: 'Cover Letters', href: '/cover-letters' },
      { label: 'Examples', href: '/examples' },
      { label: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Career Advice', href: '/career-advice' },
      { label: 'Resume Tips', href: '/resume-tips' },
      { label: 'FAQ', href: '/faq' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RC</span>
              </div>
              <span className="text-xl font-bold">ResumeCraft</span>
            </Link>
            <p className="text-slate-400 mb-4 text-sm">
              Build professional resumes that get you hired. Fast, easy, and effective.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
            Helping job seekers since 2024.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;