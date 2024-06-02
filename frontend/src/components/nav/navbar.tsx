'use client';
import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { ThemeToggle } from '../ui/theme-toggle';
import logo from '../../../public/images/hero.png';
export default function Navbar() {
  return (
    <nav className='w-full top-0 p-4 flex justify-between items-center'>
      <Link href='/' className='card-hover-anim'>
        <div className='inline-flex'>
          <Image
            src={logo}
            height={50}
            width={50}
            alt='logo'
            className='mr-1'
          />
          <h3>IntelliResearch</h3>
        </div>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/projects/list' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Projects
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/profile' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Profile
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <ThemeToggle />
      </NavigationMenu>
    </nav>
  );
}
