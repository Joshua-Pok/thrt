export default function Page({ params }: { params: { vehicleId: string } }) {
  return <div>vehicleId: {params.vehicleId}</div>;
}
