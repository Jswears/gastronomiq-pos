import PaymentGrid from "@/components/Payment/PaymentGrid";

const PaymentPage = async ({ params }: { params: Promise<{ tableId: string }> }) => {
    const id = (await params).tableId;
    return (
        <section className="text-softer-grey flex h-full p-[10px] gap-[10px]">
            <PaymentGrid tableId={id} />
        </section>
    );
}

export default PaymentPage;