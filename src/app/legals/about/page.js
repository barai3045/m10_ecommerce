import About from '@/components/legals/about';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';


const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
                <About/>
        </Suspense>
            
        </Master>
    );
};

export default page;