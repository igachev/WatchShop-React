function CreateWatch(props) {
    return (
        <div>
            <h1>Add New Product</h1>

        <div>
            <form>

        <div>
            <label>Brand:</label>
            <input type="text" />
        </div>

        <div>
            <label>Model:</label>
            <input type="text" />
        </div>

        <div>
            <label>Image Link:</label>
            <input type="text" />
        </div>

        <div>
            <label>Battery:</label>
            <input type="text" />
        </div>

        <div>
            <label>Mechanism:</label>
            <select>
                <option value="" disabled selected>Select an option</option>
                <option value="mechanical">mechanical</option>
                <option value="automatic">automatic</option>
                <option value="quartz">quartz</option>
            </select>
        </div>

        <div>
            <label>Price:</label>
            <input type="number" />
        </div>

        <div>
            <label>Strap:</label>
            <input type="text" />
        </div>

        <div>
            <label>Glass:</label>
            <input type="text" />
        </div>

        <div>
            <label>Water Resistance:</label>
            <input type="text" />
        </div>

        <div>
            <button type="submit">Submit</button>
        </div>

            </form>
        </div>

        </div>
    )
}