import * as datefns from "date-fns";

type TCustomUtils = {

}

const dateUtils: typeof datefns & TCustomUtils = {
  ...datefns
};

export default dateUtils;
