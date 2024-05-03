import Terms from '@/components/legals/terms';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
            <Terms/>
        </Suspense>
            
        </Master>
    );
};

export default page;