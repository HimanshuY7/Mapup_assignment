import React from 'react'
import '../style/Dashboard.css';
import PieSection from './PieSection';
import BrandDetail from './BrandDetail';

const GraphSection = () => {

  return (
    <div className='Graph-parent'>
        <BrandDetail/>
        <PieSection/>
    </div>
  )
}

export default GraphSection