<?php
#Compile.php
class Compile 
{
	private $listing = Array ( );
	private $content = "";
	private $compiledFile = "";
	private $status = false;

	/* obtém uma array com a listagem dos arquivos*/
	public function getList ( array $listing = [ ] ): array 
	{	
		return $this->listing = $listing;
	}

	/* juntas todos os arquivos armazenados na array*/
	public function joinFiles ( ): string 
	{
		foreach ( $this->listing as $index => $filename ) {
			$this->compiledFile .= $this->readFile ( $filename )."\r\n";
		};

		return $this->compiledFile;
	}

	/* retorna o conteudo compilado */
	public function content ( ): string 
	{
		return $this->compiledFile;
	}

	/* lê o conteúdo do arquivo */
	public function readFile ( string $file = "" ): string 
	{
		if ( file_exists ( $file ) ) {
			$this->content = file_get_contents ( $file );
		};

		return $this->content;
	}

	/* escreve o conteúdo compilado em um arquivo  */
	public function writeFile ( string $filename = "" ): bool
	{
		if ( !empty ( $this->compiledFile ) && !empty ( $filename ) ) {
			$this->status = file_put_contents ( $filename, $this->compiledFile );		
		};
		return $this->status;
	}

	/* minifica os arquivos */
	public function minify ( ): string
	{
		preg_match_all ( '/(\/\*)(.|\s)+?(\*\/)/', $this->compiledFile, $matches );
		foreach ( $matches [ 0 ] as $bloco ) {
			$this->compiledFile = str_replace ( $bloco, '', $this->compiledFile );
		};

		$this->compiledFile = str_replace ( ' ',    '', $this->compiledFile );
		$this->compiledFile = str_replace ( "\r\n", '', $this->compiledFile );
		$this->compiledFile = str_replace ( "\r",   '', $this->compiledFile );
		$this->compiledFile = str_replace ( "\n",   '', $this->compiledFile );
		$this->compiledFile = str_replace ( ' ',    '', $this->compiledFile );

		return $this->compiledFile;
	}
}