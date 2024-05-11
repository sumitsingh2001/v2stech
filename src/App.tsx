import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorBoundary from './components/ErrorBoundary';
import { fetchStories } from './store/Slices';

const ListItem = ({ story }: any) => {
  return (
    <li key={story.id}>
      <h2>{story.title}</h2>
      <p>{story.description}</p>
      <p>Category: {story.category}</p>
      <p>Price: ${story.price}</p>
    </li>
  );
}

const App = () => {
  const { stories, loading, error } = useSelector((state: any) => state.apislicedata);
  const [filterValue, setFilterValue] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  const handleFilterChange = (e: any) => {
    setFilterValue(e.target.value);
  };
  
  const filteredStories = useMemo(() => {
    return stories.filter((story: any) =>
      story.title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue, stories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
   <ErrorBoundary>
     <div>
      <input
        type="text"
        placeholder="Filter by Title"
        value={filterValue}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredStories.map((story: any) => (
          <ListItem key={story.id} story={story} />
        ))}
      </ul>
    </div>
   </ErrorBoundary>
  )
}

export default App