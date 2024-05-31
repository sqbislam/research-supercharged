export default function Loading() {
  return (
    <div className='section-inner relative h-[70vh]'>
      <div className='animate-spin spinner absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
