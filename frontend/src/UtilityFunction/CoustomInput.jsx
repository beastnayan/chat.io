function CoustomInput({ id, type, name, required, value, className, onChangeHandler }) {

    return (
        <div>

            <Input
                id={id}
                type={type}
                name={name}
                
                value={value}
                className={className}
                 onChange={onChangeHandler}

            />
        </div>
    )

}


export default CoustomInput;

{/* <input
    id="imageInput"
    type="file"
    accept="image/*"
    capture="user" // Enables camera for mobile
    className="hidden"
    name="profilePic"
    onChange={handleImageChange}
/>
 */}
