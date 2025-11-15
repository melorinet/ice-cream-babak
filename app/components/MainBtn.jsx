import React from 'react'

const MainBtn = () => {
  return (
 <div className="fab  ">
  {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
  <div tabIndex={0} role="button" className="btn fixed right-3 bottom-3 btn-lg btn-circle btn-primary bg-[#D71313] ">F</div>

  {/* buttons that show up when FAB is open */}
  <div className=' right-0 flex flex-col fixed right-3 bottom-20 ' >
 <button className="btn btn-lg btn-circle ">A</button>
  <button className="btn btn-lg btn-circle ">B</button>
  <button className="btn btn-lg btn-circle ">C</button>
  </div>
 
</div>
  )
}

export default MainBtn