

const AssetsList = () => {
    return (
        <div>
            <div className=" pt-28 pb-2 mb-14 lg:mx-10 flex flex-col sm:gap-y-4 md:flex-row justify-between items-center bg-white shadow-sm ">

            <h1 className="text-3xl font-bold">Asset Lists</h1>
            <div className="lg:w-2/5">
          <input type="search" name="search" placeholder="Search" className="input input-bordered lg:w-full"/>
            </div>

            <div>
                <select name="filterByStock" className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Filter by stock</option>
                    <option value="available">available</option>
                    <option value="out-of-stock">out-of-stock</option>
                    <option value="returnable">returnable</option>
                    <option value="non-returnable">non-returnable</option>
                </select>
            </div>
            <div>
                <select name="sortByQuantity"  className="text-lg font-semibold px-2 btn bg-purple-100 rounded-xl">
                    <option value="">Sort by Quantity</option>
                    <option value="quantity">quantity</option>
                </select>
            </div>

            </div>
            <div className="overflow-x-auto md:w-9/12 mx-auto border-2 rounded-md">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Asset name</th>
        <th>Type</th>
        <th>Quantity</th>
        <th>Date</th>
        <th>Action</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>laptop</td>
        <td>22</td>
        <td>11/22/2022</td>
        <td>U</td>
        <td>X</td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AssetsList;