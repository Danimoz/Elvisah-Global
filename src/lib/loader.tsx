'use client';

import { Oval } from "react-loader-spinner";

export default function InlineLoader(){
  return (
    <div className="flex items-center justify-center">
      <Oval
        visible={true}
        color='#4fa94d'
        height={80}
        width={80}
        ariaLabel="oval-loading"
        wrapperClass=""
        wrapperStyle={{}}
      />
    </div>
  )
}