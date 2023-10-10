import Header from "../../components/common/Header";
import QuestionUpdate from "../../components/cscenter/QuestionUpdate";
import { useParams } from "react-router-dom";

function QuestionUpdatePage() {
  let { id } = useParams();
  return (
    <div>
      <Header />
      <QuestionUpdate id={id}/>
    </div>
  );
}
export default QuestionUpdatePage;
