"use client"

import { Check, Send } from "lucide-react";
import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";
import ScrollReveal from "../ScrollReveal";
import { useRef, useState } from 'react';
import { sendEmail } from '@/app/_actions/sendEmail';
import Loading from "@/app/(pages)/loading";

export default function ContactForm() {

    const ref = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (formData: FormData) => {
        setStatus('loading');

        const result = await sendEmail(formData);

        if (result?.error) {
            setStatus('error');
            alert(result.errorMessage);
        } else {
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
            }, 2000);
            ref.current?.reset();
        }
    };

    return (
        <ScrollReveal>
            <div className="h-full w-full flex justify-center items-center p-4">
                <GlassSurface
                    width={"100%"}
                    height={"fit-content"}
                    childrenClassName="max-w-3xl mx-auto h-full w-full"
                    className="max-w-3xl"
                    simple
                >
                    <form
                        ref={ref}
                        action={handleSubmit}
                        id="contact-form"
                        className="w-full flex flex-col gap-6 p-6 md:p-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                            Contact Me
                        </h2>

                        <div className="flex flex-col gap-2">
                            <div className="w-full flex flex-col sm:flex-row justify-around items-start sm:items-center gap-0 sm:gap-8">
                                <label
                                    htmlFor="input-name"
                                    className="w-full text-sm font-medium text-white/60 ml-1"
                                >
                                    Name
                                </label>
                                <label
                                    htmlFor="input-surname"
                                    className="w-full text-sm font-medium text-white/60 ml-1 hidden sm:block"
                                >
                                    Surname
                                </label>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-8">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                    id="input-name"
                                    name="input-name"
                                    type="text"
                                    placeholder="Name"
                                    required={true}
                                />
                                <div className="w-full flex flex-col gap-2 sm:gap-0">
                                    <label
                                        htmlFor="input-surname"
                                        className="text-sm font-medium text-white/60 ml-1 sm:hidden"
                                    >
                                        Surname
                                    </label>
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                        id="input-surname"
                                        name="input-surname"
                                        type="text"
                                        placeholder="Surname"
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="w-full flex flex-col sm:flex-row justify-around items-start sm:items-center gap-0 sm:gap-8">
                                <label
                                    htmlFor="input-email"
                                    className="w-full text-sm font-medium text-white/60 ml-1"
                                >
                                    Email
                                </label>
                                <label
                                    htmlFor="input-number"
                                    className="w-full text-sm font-medium text-white/60 ml-1 hidden sm:block"
                                >
                                    Phone
                                </label>
                            </div>
                            <div className="w-full flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-8">
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                    id="input-email"
                                    name="input-email"
                                    type="email"
                                    required={true}
                                    placeholder="your@email.com"
                                />
                                <div className="w-full flex flex-col gap-2 sm:gap-0">
                                    <label
                                        htmlFor="input-number"
                                        className="text-sm font-medium text-white/60 ml-1 sm:hidden"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                        id="input-number"
                                        name="input-number"
                                        type="tel"
                                        required={false}
                                        placeholder="+39 000 000 0000"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="input-message"
                                className="text-sm font-medium text-white/60 ml-1"
                            >
                                Message
                            </label>
                            <textarea
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300 min-h-30 resize-none"
                                id="input-message"
                                name="input-message"
                                placeholder="Write here your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="
                            mt-4 w-full 
                            cursor-pointer 
                            flex flex-row items-center justify-center gap-4
                            bg-white/10 hover:bg-white/20 
                            text-white font-semibold hover:font-black
                            py-3 px-6 
                            rounded-xl border border-white/20 
                            backdrop-blur-md 
                            transition-all duration-300 
                            active:scale-95"
                        >
                            {status === 'loading' ?
                                <>
                                    <Loading />
                                    Sending...
                                </> :
                                status === 'success' ?
                                    <>
                                        <Check size={20} color="green" />
                                        Sent!
                                    </>
                                    :
                                    <>
                                        <Send size={20} />
                                        Send
                                    </>
                            }
                        </button>
                    </form>
                </GlassSurface>
            </div>
        </ScrollReveal>
    );
}
