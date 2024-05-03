import Buy from '@/components/legals/buy';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
            <Buy/>
        </Suspense>
            
        </Master>
    );
};

export default page;