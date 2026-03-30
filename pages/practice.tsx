import { useEffect, useState, useRef } from "react";

export default function Practice() {
  function ImageGallary() {
    const images: string[] = [
      "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_user_personalization&w=740&q=80",
      "https://www.equinetmedia.com/hubfs/How-to-find-b2b-blog-images.png",
      "https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg",
      "https://www.shutterstock.com/image-photo/two-chairs-sit-on-wooden-260nw-2648441151.jpg",
      "https://w0.peakpx.com/wallpaper/279/842/HD-wallpaper-blue-butterflies-flowers-water-butterflies-lake.jpg",
    ];

    const [curentImageIndex, setcurentImageIndex] = useState<number>(0);

    function handleImage(direction: string) {
      if (direction === "previous") {
        setcurentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1,
        );
      }
      if (direction === "next") {
        setcurentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1,
        );
      }
    }

    return (
      <div className="w-250 mx-auto border-4 my-5 py-5 border-white">
        <div className="flex justify-center items-center">
          <div className="p-5">
            <button
              onClick={() => handleImage("previous")}
              className="px-2.5 py-1.5 bg-black"
            >
              Previous
            </button>
          </div>

          <div>
            <img
              className="w-[350px] h-[300px] objet-cover"
              src={images[curentImageIndex]}
              alt=""
            />
          </div>

          <div className="p-5">
            <button
              onClick={() => handleImage("next")}
              className="px-2.5 py-1.5 bg-black"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  function OTP() {
    const length = 5;
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
      inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const value = e.target.value.replace(/\D/g, ""); // allow only numbers
      if (!value) return;

      const newOtp = [...otp];
      newOtp[index] = value[0];
      setOtp(newOtp);

      // move focus to next input if exists
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === "Backspace") {
        const newOtp = [...otp];

        if (otp[index]) {
          // if current input has value, clear it
          newOtp[index] = "";
          setOtp(newOtp);
        } else if (index > 0) {
          // if empty, move focus to previous input and clear it
          inputsRef.current[index - 1]?.focus();
          newOtp[index - 1] = "";
          setOtp(newOtp);
        }
        e.preventDefault(); // prevent default backspace behavior
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();

      const pasteData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, length);

      const newOtp = pasteData.split("");
      while (newOtp.length < length) newOtp.push("");

      setOtp(newOtp);

      // focus last filled input
      const focusIndex = Math.min(pasteData.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    };

    return (
      <div className="w-250 mx-auto my-5 py-5 border-2 border-white">
        <div className="flex gap-3 justify-center items-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              // ref={(el) => (inputsRef.current[index] = el)}
              ref={(el: HTMLInputElement | null) => {
                inputsRef.current[index] = el; // assign element
              }}
              value={digit}
              maxLength={1}
              type="text"
              inputMode="numeric"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="p-3 w-12.5 border border-white outline-none text-center text-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* {ImageGallary()} */}
      {OTP()}
    </div>
  );
}
