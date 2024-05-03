import Refund from '@/components/legals/refund';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
            <Refund/>
        </Suspense>
            
        </Master>
    );
};

export default page;