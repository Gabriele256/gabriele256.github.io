export default async function TestPage() {

    await new Promise(resolve => setTimeout(resolve, 500000));

    return (
        <div className="z-999 w-screen h-screen absolute top-0 left-0 bg-neutral-900 flex items-center justify-center overflow-hidden">
            <p className="text-white">CIAO</p>
        </div>
    );
}
