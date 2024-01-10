import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import LeftNavMenuItem from './LeftNavMenuItem'
import {categories} from '../utils/constants'
import { Context } from '../context/ContextApi'

const LeftNav = () => {

    const {selectedCategory, setSelectedCategory, mobileMenu} = useContext(Context)

    const clickHandler = (name, type) => {
        switch(type){
            case 'category':
                return setSelectedCategory(name)
            case 'home':
                return setSelectedCategory(name)
            case 'menu':
                return false
            default:
                break
        }
    }


    const navigate = useNavigate()

  return (
    <div
        className={`md:block w-[240px] hover:overflow-y-scroll h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all 
        ${mobileMenu ? "translate-x-0" : ""}`}
    >
        <div className='flex flex-col px-5'>
            {categories.map((category,idx)=> {
                    return (
                        <React.Fragment key={idx}> 
                            <LeftNavMenuItem
                                text={category.type === "home" ? "Home" : category.name}
                                icon = {category.icon}
                                action = {()=> {
                                    clickHandler(category.name, category.type)
                                    navigate('/')
                                }}
                                className = {`${selectedCategory === category.name ? 'bg-white/[0.15]' : ""}`}
                            />
                            {category.divider && (
                                <hr className='my-5 border-white/[0.2]' />
                            )}
                        </React.Fragment>
                    )
                })}
               
        </div>

    </div>
  )
}

export default LeftNav