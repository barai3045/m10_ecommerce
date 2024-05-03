import Privacy from '@/components/legals/privacy';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
            <Privacy/>
        </Suspense>
            
        </Master>
    );
};

export default page;