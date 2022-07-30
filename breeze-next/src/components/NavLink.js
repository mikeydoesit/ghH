import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link {...props}>
        <a
            className={`inline-flex w-full justify-start items-center py-2.5 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
                active
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                    : 'border-transparent text-gray-700 hover:text-primary focus:text-gray-700 focus:border-gray-300'
            }`}>
            {children}
        </a>
    </Link>
)

export default NavLink
