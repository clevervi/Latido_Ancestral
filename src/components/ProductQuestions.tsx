'use client';

import { useState } from 'react';
import { FaThumbsUp, FaQuestionCircle } from 'react-icons/fa';
import { useQuestionStore } from '@/store/questionStore';
import { useUserStore } from '@/store/userStore';
import type { Question } from '@/types';

interface ProductQuestionsProps {
  productId: string;
}

export default function ProductQuestions({ productId }: ProductQuestionsProps) {
  const { getProductQuestions, addQuestion, answerQuestion, markHelpful } = useQuestionStore();
  const { user } = useUserStore();
  const questions = getProductQuestions(productId);

  const [showForm, setShowForm] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Debes iniciar sesión para hacer una pregunta');
      return;
    }

    addQuestion({
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      question: questionText,
    });

    setQuestionText('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#F4A460] pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#8B4513] dark:text-[#FFE4B5]">
            <FaQuestionCircle className="text-[#8B4513] dark:text-[#F4A460]" />
            Preguntas y Respuestas
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Hacer una pregunta
          </button>
        </div>
        <p className="text-[#2C1810] dark:text-[#FFF8DC]">
          {questions.length} {questions.length === 1 ? 'pregunta' : 'preguntas'} sobre este producto
        </p>
      </div>

      {/* Formulario */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#FAEBD7] dark:bg-[#4A3426] p-6 rounded-lg space-y-4 border-2 border-primary">
          <h3 className="text-xl font-semibold text-[#8B4513] dark:text-[#FFE4B5]">Tu pregunta</h3>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-[#8B4513] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-[#5C3D2E] text-[#2C1810] dark:text-[#FFF8DC]"
            placeholder="¿Qué quieres saber sobre este producto?"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            >
              Publicar pregunta
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2 border border-[#8B4513] text-[#8B4513] dark:text-[#FFE4B5] dark:border-[#FFE4B5] rounded-lg hover:bg-[#FFF8DC] dark:hover:bg-[#5C3D2E] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de preguntas */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <p className="text-center text-[#8B4513] dark:text-[#F4A460] py-8">
            Sé el primero en hacer una pregunta sobre este producto
          </p>
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onMarkHelpful={markHelpful}
              onAnswer={(answer) => answerQuestion(question.id, answer, 'Vendedor')}
            />
          ))
        )}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  onMarkHelpful,
  onAnswer,
}: {
  question: Question;
  onMarkHelpful: (id: string) => void;
  onAnswer: (answer: string) => void;
}) {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(answerText);
    setAnswerText('');
    setShowAnswerForm(false);
  };

  return (
    <div className="bg-white dark:bg-[#3D2817] border-2 border-[#F4A460] rounded-lg p-6 space-y-3 shadow-sm">
      {/* Pregunta */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FaQuestionCircle className="text-[#8B4513] dark:text-[#F4A460] flex-shrink-0" />
              <span className="font-semibold text-[#8B4513] dark:text-[#FFE4B5]">{question.userName}</span>
              <span className="text-sm text-[#2C1810] dark:text-[#F5DEB3]">
                {new Date(question.createdAt).toLocaleDateString('es-ES')}
              </span>
            </div>
            <p className="text-[#2C1810] dark:text-[#FFF8DC] ml-6">{question.question}</p>
          </div>
        </div>

        {/* Respuesta */}
        {question.answer ? (
          <div className="ml-6 mt-3 pl-4 border-l-2 border-secondary bg-[#FFE4B5] dark:bg-[#5C3D2E] p-3 rounded">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[#8B4513] dark:text-[#FFE4B5]">{question.answeredBy}</span>
              <span className="text-sm text-[#2C1810] dark:text-[#F5DEB3]">
                {question.answeredAt && new Date(question.answeredAt).toLocaleDateString('es-ES')}
              </span>
            </div>
            <p className="text-[#2C1810] dark:text-[#FFF8DC]">{question.answer}</p>
          </div>
        ) : (
          <div className="ml-6 mt-2">
            {!showAnswerForm ? (
              <button
                onClick={() => setShowAnswerForm(true)}
                className="text-sm text-[#8B4513] dark:text-[#F4A460] hover:text-secondary"
              >
                Responder
              </button>
            ) : (
              <form onSubmit={handleSubmitAnswer} className="space-y-2">
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-[#8B4513] rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-[#5C3D2E] text-[#2C1810] dark:text-[#FFF8DC]"
                  placeholder="Escribe tu respuesta..."
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-1 bg-primary text-white text-sm rounded hover:bg-secondary"
                  >
                    Responder
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAnswerForm(false)}
                    className="px-4 py-1 border border-[#8B4513] text-[#8B4513] dark:text-[#FFE4B5] dark:border-[#FFE4B5] text-sm rounded hover:bg-[#FFF8DC] dark:hover:bg-[#5C3D2E]"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Útil */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#F4A460]">
        <button
          onClick={() => onMarkHelpful(question.id)}
          className="flex items-center gap-2 text-sm text-[#8B4513] dark:text-[#F4A460] hover:text-secondary transition-colors"
        >
          <FaThumbsUp />
          Útil ({question.helpful})
        </button>
      </div>
    </div>
  );
}
