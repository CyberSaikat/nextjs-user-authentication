"use client";

export default function UploadImage() {
    
  const uploadImage = () => {
    alert("Upload Image");
  }
  return (
    <button
      className="rounded-full h-32 w-32 p-1 border-2 border-red-600 shadow-lg bg-white flex items-center justify-center"
      onClick={uploadImage}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </button>
  );
}
