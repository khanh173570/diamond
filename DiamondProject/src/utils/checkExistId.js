const checkExistId = async (api, id) =>{
    try {
        // get by id
        const response = await fetch(
          `${api}/${id}`
        );
        if (response.status === 200) {
          return true;
        } else if (response.status === 404) {
          return false;
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        console.error("Error checking ID existence:", error);
        return false;
      }
}
export default checkExistId