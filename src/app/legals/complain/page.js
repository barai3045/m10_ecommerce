import Complain from '@/components/legals/complain';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
            <Complain/>
        </Suspense>
            
        </Master>
    );
};

export default page;