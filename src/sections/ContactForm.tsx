export default function ContactForm() {
  return (
    <section className="pb-8 px-6" id="contato">
      <div className="max-w-2xl mx-auto bg-gray-200 p-8 rounded shadow-md">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-destructive mb-8">
          Entre em Contato
        </h2>

        <form className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block mb-1 font-medium">Nome</label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full border border-black px-4 py-2 rounded bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full border border-black px-4 py-2 rounded bg-white"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block mb-1 font-medium">Telefone</label>
            <input
              type="tel"
              placeholder="Telefone"
              className="w-full border border-black px-4 py-2 rounded bg-white"
            />
          </div>

          {/* Perfil */}
          <div>
            <label className="block mb-2 font-medium">Perfil</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="perfil" value="municipal" />
                <span>Sou gestor municipal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="perfil" value="estadual" />
                <span>Sou gestor estadual</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="perfil" value="pesquisa" />
                <span>Represento uma instituição de pesquisa</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="perfil" value="outro" />
                <span>Outro</span>
              </label>
            </div>
          </div>

          {/* Mensagem */}
          <div>
            <label className="block mb-1 font-medium">Mensagem</label>
            <textarea
              placeholder="Caso queira, escreva uma mensagem aqui…"
              className="w-full border border-black px-4 py-2 rounded h-32 resize-none bg-white"
            ></textarea>
          </div>

          {/* Botão */}
          <div>
            <button
              type="submit"
              className="bg-primary text-white font-bold px-6 py-2 rounded hover:bg-green-900 transition cursor-pointer"
            >
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
