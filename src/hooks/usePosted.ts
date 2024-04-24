import { useEffect, useState } from "react";
import { getThreadAPI } from "../libs/Api/Call/thread";

const usePosted = () => {

    const [postTime, setPostTime] = useState<any>()

    useEffect(() => {
        const getPosted = async () => {
            const res = await getThreadAPI()
            const timePost = res.data.data.map((item: any) => item.createAt)

            const getMinutes = timePost.map((item: any) => Math.abs(new Date(item).getMinutes()))
            const getHours = timePost.map((item: any) => Math.abs(new Date(item).getHours()))
            const getDate = timePost.map((item: any) => Math.abs(new Date(item).getDate()))

            let dataDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
            const getDay = timePost.map((item: any) => Math.abs(new Date(item).getDay()))
            let day = getDay.map((item: any) => dataDays[item])

            let dataMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
            const getMonth = timePost.map((item: any) => Math.abs(new Date(item).getMonth()))
            let month = getMonth.map((item: any) => dataMonths[item])
            const getYear = timePost.map((item: any) => Math.abs(new Date(item).getFullYear()))

            const dataTime = {
                getMinutes,
                getHours,
                getDate,
                day,
                month,
                getYear
            }
            setPostTime(dataTime)

        }

        getPosted()
    }, [])
    

    return {
        postTime
    }

}

export default usePosted