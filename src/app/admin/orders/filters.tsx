'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";

export default function OrderFilters() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const { push } = useRouter();

  const handleStatusChange = (newStatus: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('status', newStatus);
    push(`?${newSearchParams.toString()}`);
  }

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('email', email);
    push(`?${newSearchParams.toString()}`);
  }

  return (
    <section className="flex items-center justify-between my-6">
      <div>
        <Select onValueChange={(value) => handleStatusChange(value)} >
          <SelectTrigger>
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PAID">PAID</SelectItem>
            <SelectItem value="PROCESSING">PROCESSING</SelectItem>
            <SelectItem value="SHIPPED">SHIPPED</SelectItem>
            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>        
        </Select>
      </div>

      <div className="flex gap-x-4">
        <Input 
          type="search" 
          placeholder="Search by email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </section>
  )
}


