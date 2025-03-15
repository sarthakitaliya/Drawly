"use client"
import { useUserStore } from "@repo/store"


export default  function adminPage(){
    const {user} = useUserStore();


    return(
        <div>Here is the authenticated page {JSON.stringify(user)}</div>
    )
}