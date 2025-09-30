export default function SuggestionDialog({ suggestions, onSelect }) {
    if (!suggestions || suggestions.length === 0) return null;
  
    return (
      <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-md z-10 w-full max-w-md">
        <ul className="divide-y divide-gray-200">
          {suggestions.map((text, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(text)}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    );
  }