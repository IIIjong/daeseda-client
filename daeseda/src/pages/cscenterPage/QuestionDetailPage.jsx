import Header from "../../components/common/Header";
import QuestionDetail from "../../components/cscenter/QuestionDetail";

function QuestionDetailPage({question}) {
  return (
    <div>
      <Header />
      <QuestionDetail question={question}/>
    </div>
  );
}
export default QuestionDetailPage;
