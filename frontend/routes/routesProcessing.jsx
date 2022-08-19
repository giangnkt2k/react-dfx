const routesDefault = {
  createSeller: [
    { label: "Basic Information", status: "pending" },
    { label: "Further Information", status: "new" },
    { label: "Success", status: "new" },
  ],
  createRealProduct: [
    { label: "Submit new request", status: "pending" },
    { label: "Seller make an offer", status: "new" },
    { label: "Communicate and select offer", status: "new" },
    { label: "Confirm the order within 15 days", status: "new" },
  ],
}

export default routesDefault
