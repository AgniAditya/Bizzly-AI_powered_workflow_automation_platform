
function UserPrompt({ text }: { text: string }) {
  return (
    <div className="w-full h-fit justify-end flex">
      <div className="bg-[#1f1f1f] text-white text-md px-4 py-2 rounded-lg">
        {text}
      </div>
    </div>
  )
}

export default UserPrompt