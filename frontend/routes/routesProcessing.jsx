const routesDefault = {
  createSeller: [
    { label: "Basic Information", status: "pending" },
    { label: "Processing", status: "new" },
    { label: "Success", status: "new" },
  ],
  minProduct: [
    { label: "Basic Information", status: "pending" },
    { label: "Processing", status: "new" },
    { label: "Success", status: "new" },
  ],
  createRealProduct: [
    { label: "Basic Information", status: "pending" },
    { label: "Add Images", status: "new" },
    { label: "Processing", status: "new" },
    { label: "Success", status: "new" },
  ],
  functions: {
    nextStep: (progress) => {
      for (let i = 0; i < progress.length; i++) {
        if (progress[i].status === "pending") {
          progress[i].status = "done"
        } else if (progress[i].status === "new") {
          progress[i].status = "pending"
          break
        }
      }
      return progress
    },
    previousStep: (progress) => {
      for (let i = progress.length - 1; i >= 0; i--) {
        if (progress[i].status === "pending" && i !== 0) {
          progress[i].status = "new"
        } else if (progress[i].status === "done") {
          progress[i].status = "pending"
          break
        }
      }
      return progress
    },
    nextErrorStep: (progress) => {
      for (let i = 0; i < progress.length; i++) {
        if (progress[i].status === "pending") {
          progress[i].status = "done"
        } else if (progress[i].status === "new") {
          progress[i].status = "error"
          break
        }
      }
      return progress
    },
  },
}

export default routesDefault
