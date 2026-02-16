import { Send } from "lucide-react";
import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";

export default function ContactForm() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <GlassSurface
                width={"50%"}
                height={"100%"}
                className="min-w-3xl h-full w-full"
            >
                <form
                    id="contact-form"
                    className="w-full flex flex-col gap-6 p-8"
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Contact Me
                    </h2>

                    <div className="flex flex-col gap-2">
                        <div className="w-full flex flex-row justify-around items-center gap-8">
                            <label
                                htmlFor="input-name"
                                className="w-full text-sm font-medium text-white/60 ml-1"
                            >
                                Name
                            </label>
                            <label
                                htmlFor="input-surname"
                                className="w-full text-sm font-medium text-white/60 ml-1"
                            >
                                Surname
                            </label>
                        </div>
                        <div className="w-full flex flex-row justify-around items-center gap-8">
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                id="input-name"
                                name="input-name"
                                type="text"
                                placeholder="Name"
                                required={true}
                            />
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

                    <div className="flex flex-col gap-2">
                        <div className="w-full flex flex-row justify-around items-center gap-8">
                            <label
                                htmlFor="input-email"
                                className="w-full text-sm font-medium text-white/60 ml-1"
                            >
                                Email
                            </label>
                            <label
                                htmlFor="input-number"
                                className="w-full text-sm font-medium text-white/60 ml-1"
                            >
                                Phone
                            </label>
                        </div>
                        <div className="w-full flex flex-row justify-around items-center gap-8">
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                id="input-email"
                                name="input-email"
                                type="email"
                                placeholder="your@email.com"
                            />
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-white/10 transition-all duration-300"
                                id="input-number"
                                name="input-number"
                                type="tel"
                                placeholder="+39 000 000 0000"
                            />
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
                            text-white hover:text-cyan-600 font-semibold hover:font-black
                            py-3 px-6 
                            rounded-xl border border-white/20 
                            backdrop-blur-md 
                            transition-all duration-300 
                            active:scale-95"
                    >
                        <Send size={20} />
                        Send
                    </button>
                </form>
            </GlassSurface>
        </div>
    );
}
