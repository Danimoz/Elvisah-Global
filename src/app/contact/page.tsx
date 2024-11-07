'use client';

import { contact } from '@/actions/product';
import SubmitButton from '@/components/submitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { toast } from 'sonner';

const initialActionState = {
  message: '',
  status: 0
};

export default function ContactPage() {
  const [formState, formAction] = useFormState(contact, initialActionState);
  const formRef = useRef<HTMLFormElement>(null);

  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_NUMBER as string 
    const whatsappUrl = `https://wa.me/${phoneNumber}`
    window.open(whatsappUrl, '_blank')
  }

  async function handleSubmit(formData: FormData) {
    await formAction(formData);
    if (formState.status === 200) {
      toast.success(formState.message);
      formRef.current?.reset();
    } else {
      toast.error(formState.message);
    }    
  }

  
  return (
    <div className="container mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form action={handleSubmit} ref={formRef} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea id="message" name="message" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <SubmitButton buttonText="Send Message" />
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <MdEmail className="text-2xl mr-2 text-gray-600" />
              <span>elvisahglobal@gmail.com</span>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <h2 className="text-xl font-semibold mb-4">Chat with us on WhatsApp</h2>
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600"
            >
              <FaWhatsapp className="mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <h2 className="text-xl font-semibold mb-4">Instagram</h2>
            <Button 
              className="w-full bg-pink-500 hover:bg-pink-600"
              asChild
            >
              <Link href="https://instagram.com/official_elvisah_global" target='_blank' className='flex items-center justify-center'>
                <FaInstagram className="mr-2" />
                Reach us on Instagram
              </Link>
            </Button>            
          </div>
        </div>
      </div>
    </div>
  );
}