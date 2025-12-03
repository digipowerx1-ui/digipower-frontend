import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GradientText from "@/components/GradientText";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  title: z.string().min(2, "Title is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual API call
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        {/* ⭐ PAGE TITLE ADDED HERE */}
                        <Helmet>
                          <title>Contact DigiPowerX | AI Cloud & Infrastructure Solutions

      
            
                  </title>
                          <meta
                            name="description"
                            content="Contact DigiPowerX | Speak With Our AI Cloud & Advanced Cloud Infrastructure Specialists for Enterprise Data Center Solutions
."
                          />
                        </Helmet>
      <Navigation />

      {/* ---------- HERO SECTION ---------- */}
      <section className="relative bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 text-white py-20 px-6 transition-colors duration-300">
        {/* Radial Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,255,0.08),transparent_70%)] pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 pt-10">
            <GradientText>Contact Us</GradientText>
          </h1>

         <p className="text-lg max-w-2xl mx-auto">
  <GradientText>
    Please submit the form below or contact our investor relations team at{" "}
    <span className="font-semibold">ir@digipowerx.com</span>
    <br /> 
    <span className="font-semibold">888-474-9222</span>.
  </GradientText>
</p>

        </div>
      </section>

      {/* ---------- CONTACT FORM SECTION ---------- */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 rounded-2xl p-10 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Jason"
                {...register("firstName")}
                aria-required="true"
                aria-invalid={!!errors.firstName}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs mt-1" role="alert">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Rogers"
                {...register("lastName")}
                aria-required="true"
                aria-invalid={!!errors.lastName}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs mt-1" role="alert">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <label htmlFor="companyName" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="Company Name"
                {...register("companyName")}
                aria-required="true"
                aria-invalid={!!errors.companyName}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {errors.companyName && (
                <span className="text-red-500 text-xs mt-1" role="alert">
                  {errors.companyName.message}
                </span>
              )}
            </div>

            {/* Work Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                Work Email *
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@website.com"
                {...register("email")}
                aria-required="true"
                aria-invalid={!!errors.email}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                Title *
              </label>
              <input
                id="title"
                type="text"
                placeholder="CEO"
                {...register("title")}
                aria-required="true"
                aria-invalid={!!errors.title}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
              {errors.title && (
                <span className="text-red-500 text-xs mt-1" role="alert">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+1 415-123-4567"
                {...register("phone")}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Message (Full Width) */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors duration-300">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Your message..."
                {...register("message")}
                aria-required="true"
                aria-invalid={!!errors.message}
                className="border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 !text-slate-900 dark:!text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-xs mt-1" role="alert">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit Button (Full Width) */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-navy to-brand-cyan text-white py-3 rounded-lg font-semibold tracking-wide hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
