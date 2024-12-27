const parseBoolean = (value) => {
    if (typeof value !== 'string') return;

    const normalizedValue = value.toLowerCase();
    if (normalizedValue === 'true') return true;
    if (normalizedValue === 'false') return false;
  };

  const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;

    const validTypes = ['personal', 'work', 'other'];
    if (validTypes.includes(type)) return type;
  };

  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseContactType(type);
    const parsedIsFavourite = parseBoolean(isFavourite);

    return {
      contactType: parsedType,
      isFavourite: parsedIsFavourite,
    };
  };
