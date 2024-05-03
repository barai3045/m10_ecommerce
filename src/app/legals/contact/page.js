import Contact from '@/components/legals/contact';
import Master from '@/components/master/Master';
import LegalSkeleton from '@/skeleton/LegalSkeleton';
import React, { Suspense } from 'react';

const page = () => {
    return (
        <Master>
        <Suspense fallback={<LegalSkeleton/>}>
            <Contact/>
        </Suspense>
            
        </Master>
    );
};

export default page;