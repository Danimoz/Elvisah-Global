'use client';

import { Grid } from "react-loader-spinner";

export default function Loading(){
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Grid 
        visible={true}
        radius='12.5'
        color='#4fa94d'
        height={100}
        width={100}
        ariaLabel="grid-loading"
        wrapperClass="grid-wrapper"
        wrapperStyle={{}}
      />
    </div>
  )
}