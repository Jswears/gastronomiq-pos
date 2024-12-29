import OrdersGrid from "@/components/Orders/OrdersGrid";

const OrderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    return (

        <section className="text-softer-grey flex h-full p-[10px] gap-[10px]">
            <OrdersGrid tableId={id} />
        </section>
    );
}
export default OrderPage;