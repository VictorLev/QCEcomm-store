"use client"

import { Product } from "@/type";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";



interface InfoProps {
    data: Product;
}


const Info: React.FC<InfoProps> = ({
    data
}) => {
    const locale = useLocale(); 
    const name = 'name'.concat(locale.charAt(0).toUpperCase()+locale[1]);
    const value = 'value'.concat(locale.charAt(0).toUpperCase()+locale[1]);
    const description = 'description'.concat(locale.charAt(0).toUpperCase()+locale[1]);
    const t = useTranslations('CartPage');

    const properties = [
        data.province,
        data.sportsteam,
        data.type,
        data.size,
        data.cday
    ].filter((x) => x.name!='N/A')

    const propColor = data.color ?? false


    return ( 
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data[name as keyof Product].toString()}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price}/>
                </p>
            </div>
            <hr className="my-4"/>
            <div className="flex flex-col gap-y-6">
                {properties.map( (property) => 
                    ( <div className="flex items-center gap-x-4">
                        <h3 className="font-semibold text-black">{t(typeof property)}:</h3>
                            {property[value as keyof typeof property]}
                    </div> )
                )}
                { propColor ? 
                    <div className="flex items-center gap-x-4">
                        <h3 className="font-semibold text-black">{t('Color')}:</h3>
                            <div className="h-6 w-6 rounded-full border border-gray-600" style={{backgroundColor: data?.color?.value}} />
                    </div>
                    : <></>
                }
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button className="flex item gap-x-2 bg-blue-800 text-white">
                    {t("Add to Cart")}
                    <ShoppingCart />
                </Button>
            </div>
            <hr className="my-4"/>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-sm text-gray-900">
                    {data[description as keyof Product].toString()}
                </p>
            </div>

        </div>
     );
}
 
export default Info;