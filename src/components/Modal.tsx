export default function Modal({onClose, message}) {
    return (
        <div className="absolute w-full h-full z-10 bg-black bg-opacity-80 flex">
            <div className="w-60 h-40 bg-white m-auto rounded">
                <div className="w-full text-center my-8">
                    {message}
                </div>
                <div
                    className="flex w-20 h-8 bg-blue-500 rounded items-center justify-center mx-auto"
                    onClick={onClose}
                >
                    <p>닫기</p>
                </div>
            </div>
        </div>
    );
}