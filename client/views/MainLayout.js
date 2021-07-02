import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon,MapIcon } from '@heroicons/react/outline'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../../client/components/layout/Navbar'
const navigation = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports']
const profile = ['Your Profile', 'Settings', 'Sign out']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainLayout(props) {
  return (
   
    <div>

<Navbar/>
      <div className="grid grid-cols-6 gap-24">
        <div>
          <Sidebar />
        </div>
        <div className="col-span-5">
          <main>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {/* Replace with your content */}
              {props.children}
              {/* /End replace */}
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}