import GlassSurface from "@/app/_components/GlassSurface/GlassSurface";

export default function TestErrorPage() {
    throw new Error("errore di prova simulato");

    return (
        <div className="w-full h-full" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1770860354865-415bd1e5af6d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}>
            <GlassSurface
                width={300}
                height={200}
                borderRadius={50}
                className="my-custom-class"
            >
                <h2>Glass Surface Content</h2>
            </GlassSurface>
        </div>
    );
}
