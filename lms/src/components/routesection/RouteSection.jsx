import React from 'react'
import "./RouteSection.css"
import MidSection from '../midsection/MidSection'
import LearnSection from '../learnsection/LearnSection'
import CourseSuggestSection from '../coursesuggestsection/CourseSuggestSection'

function RouteSection() {
  return (
    <div >
        <MidSection/>
        <LearnSection/>
        <CourseSuggestSection/>
    </div>
  )
}

export default RouteSection