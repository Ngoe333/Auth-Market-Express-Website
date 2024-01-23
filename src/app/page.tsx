import { Hero } from '@/components/ui/hero';
import { PopularVendors } from '@/components/ui/popular-vendors';
import { Testimonials } from '@/components/ui/testimony';
import { OurServices } from '@/components/ui/our-services';
import { Menu } from '@/components/ui/all-menus';


export default function Home() {
  return (

    <>
      <Hero />
      <PopularVendors />
      <Menu />
      <Testimonials />
      <OurServices />
    </>

  );
}
