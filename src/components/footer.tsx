
export default function Footer(){
  const date = new Date();

  return (
    <footer className='flex flex-col justify-center items-center p-4 bg-[#191919] text-white'>
      <h2 className="text-3xl font-bold">Elvisah</h2>
      <p className='text-center text-sm text-gray-400'>
        &copy; {date.getFullYear()} All rights reserved.
      </p>
    </footer>
  )
}