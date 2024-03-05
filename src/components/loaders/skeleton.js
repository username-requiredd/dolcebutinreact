import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./skeleton.css";
const renderSkeleton = () => {
  let columns = [];
  for (let i = 0; i < 8; i++) {
    columns.push(
      <div className="grid-item ">
        <Stack spacing={1} className="skeleton">
          <Skeleton
            variant="rectangular"
            // width={230}
            height={320}
            className="rectangular"
          />
          <Skeleton variant="rounded" height={10} className="firsttext" />
          <Skeleton
            variant="rounded"
            // width={70}
            height={10}
            className="secondtext"
          />
        </Stack>
      </div>
    );
    return { columns };
  }
};

export default renderSkeleton;
